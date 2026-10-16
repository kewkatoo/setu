import uuid


def generate_event_id() -> str:
    """Generate a short, unique event ID prefixed with 'evt_'."""
    return f"evt_{uuid.uuid4().hex[:12]}"
