import re
import json
from .models import Roadmap, Topic, Subtopic


def extract_and_parse_json_from_llm_response(raw_response_string: str) -> dict | None:
    """
    Extracts a JSON string from an LLM response (assuming it's wrapped in ```json\n...\n```)
    and parses it into a Python dictionary.

    Args:
        response_dict: The dictionary containing the LLM's response string.

    Returns:
        A dictionary parsed from the JSON, or None if extraction/parsing fails.
    """

    # Regex to find the JSON block wrapped in ```json ... ```
    # re.DOTALL ensures '.' matches newlines
    json_pattern = re.compile(r"```json\s*\n(.*?)\n```", re.DOTALL)
    match = json_pattern.search(raw_response_string)

    if match:
        json_string = match.group(1)
        try:
            parsed_json_data = json.loads(json_string)
            return parsed_json_data
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            return None
    else:
        print("No JSON block found in the response.")
        return None

def serialize_json_to_db_models(parsed_roadmap_data: dict, full_llm_response_text: str):
    """
    Takes the parsed roadmap data and saves it to Django database models.

    Args:
        parsed_roadmap_data: The dictionary parsed from the LLM's JSON output.
                             Expected to have a 'roadmap_data' key.
        full_llm_response_text: The complete raw string from the LLM's 'response' field.
                                This will be saved directly to the llm_response TextField.

    Returns:
        The created Roadmap instance, or None if an error occurs during saving.
    """
    if not parsed_roadmap_data or "roadmap_data" not in parsed_roadmap_data:
        print("Invalid parsed roadmap data structure.")
        return None

    roadmap_data = parsed_roadmap_data["roadmap_data"]

    try:
        # 1. Create the Roadmap instance
        roadmap_instance = Roadmap.objects.create(
            interviewer=roadmap_data.get("interviewer", "Unknown Interviewer"),
            topic=roadmap_data.get("topic", "General Interview Preparation"),
            llm_response=full_llm_response_text # Save the entire LLM response text
        )
        print(f"Roadmap created: ID={roadmap_instance.id}, Topic='{roadmap_instance.topic}'")

        # 2. Create Topic instances and link them to the Roadmap
        for topic_data in roadmap_data.get("topics", []):
            topic_instance = Topic.objects.create(
                roadmap=roadmap_instance,
                title=topic_data.get("title", "Untitled Topic"),
                importance_score=float(topic_data.get("importance_score", 0.0))
            )
            print(f"  Topic created: '{topic_instance.title}' (Importance: {topic_instance.importance_score})")

            # 3. Create Subtopic instances and link them to the Topic
            for subtopic_data in topic_data.get("subtopics", []):
                subtopic_title = subtopic_data.get("title") if isinstance(subtopic_data, dict) else str(subtopic_data)

                Subtopic.objects.create(
                    topic=topic_instance,
                    title=subtopic_title
                )
        print("Roadmap and all associated topics/subtopics saved successfully!")
        return roadmap_instance

    except Exception as e:
        print(f"An error occurred during database serialization: {e}")
        return None
