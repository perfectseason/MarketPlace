
from django.contrib import admin
from django.urls import include, path
import debug_toolbar


admin.site.site_header = "Marketplace Admin"
admin.site.site_title = "Marketplace Admin Portal"
admin.site.index_title = "Welcome to the Marketplace Admin Portal"



urlpatterns = [
    path("admin/", admin.site.urls),

    path("__debug__/", include(debug_toolbar.urls)),

    path("api/", include("store.urls")),

    path("api/auth/", include("djoser.urls")),
    path("api/auth/", include("djoser.urls.jwt")),
]
