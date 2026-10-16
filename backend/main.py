"""
Setu backend — entrypoint.

Run with:
    uvicorn main:app --reload
"""

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from routes import events, device, profile

app = FastAPI(
    title="Setu Backend",
    description="AI-powered environmental awareness system for Deaf and Hard-of-Hearing users.",
    version="1.0.0",
)

# CORS is fully open since this serves a local dashboard with no auth.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    """Return a clean 422 with details when a request payload fails validation
    (e.g. missing fields, invalid sound labels, out-of-range values)."""
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors()},
    )


app.include_router(events.router)
app.include_router(device.router)
app.include_router(profile.router)


@app.get("/", tags=["health"])
def health_check() -> dict[str, str]:
    """Simple health check / root endpoint."""
    return {"status": "ok", "service": "Setu backend"}
