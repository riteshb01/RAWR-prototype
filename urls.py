"""
Bengal RAWR — API URL Configuration (v1)
"""

from django.http import JsonResponse
from django.urls import path, include

from apps.syllabus.views import (
    # Courses
    CourseListCreateView,
    CourseDetailView,
    # Syllabi
    UploadSyllabusView,
    ReprocessSyllabusView,
    # Events
    EventListView,
    EventDetailView,
    VerifyEventView,
    # Conflicts
    ConflictListView,
    RunConflictAnalysisView,
    # Dashboard
    DashboardSummaryView,
    HeatmapDataView,
    WeeklyWorkloadView,
)

app_name = "syllabus"


def health_check(request):
    """Lightweight liveness probe for load balancers / k8s."""
    return JsonResponse({"status": "ok"})


# ── Courses ───────────────────────────────────────────────────────────
course_patterns = [
    path('', CourseListCreateView.as_view(), name='course-list-create'),
    path('<int:pk>/', CourseDetailView.as_view(), name='course-detail'),
]

# ── Syllabus upload ────────────────────────────────────────────────────
syllabus_patterns = [
    path('upload/', UploadSyllabusView.as_view(), name='upload-syllabus'),
    path('<int:pk>/reprocess/', ReprocessSyllabusView.as_view(), name='reprocess-syllabus'),
]

# ── Events ─────────────────────────────────────────────────────────────
event_patterns = [
    path('', EventListView.as_view(), name='event-list'),
    path('<int:pk>/', EventDetailView.as_view(), name='event-detail'),
    path('<int:pk>/verify/', VerifyEventView.as_view(), name='event-verify'),
]

# ── Conflicts ──────────────────────────────────────────────────────────
conflict_patterns = [
    path('', ConflictListView.as_view(), name='conflict-list'),
    path('analyze/', RunConflictAnalysisView.as_view(), name='conflict-analyze'),
]

# ── Dashboard ──────────────────────────────────────────────────────────
dashboard_patterns = [
    path('', DashboardSummaryView.as_view(), name='dashboard-summary'),
    path('heatmap/', HeatmapDataView.as_view(), name='dashboard-heatmap'),
    path('weekly-workload/', WeeklyWorkloadView.as_view(), name='weekly-workload'),
]

# ── Root URL conf ──────────────────────────────────────────────────────
urlpatterns = [
    path('health/', health_check, name='health-check'),
    path('courses/', include((course_patterns, 'courses'))),
    path('syllabi/', include((syllabus_patterns, 'syllabi'))),
    path('events/', include((event_patterns, 'events'))),
    path('conflicts/', include((conflict_patterns, 'conflicts'))),
    path('dashboard/', include((dashboard_patterns, 'dashboard'))),
]
