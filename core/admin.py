
from django.contrib import admin
from django.contrib.auth.models import User
from .models import Job, Application, Resume

# Unregister the default User admin before custom registration to avoid errors
if admin.site.is_registered(User):
    admin.site.unregister(User)

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    # Fields to display in the admin table list
    list_display = ('title', 'company', 'location', 'posted_at', 'is_approved')
    
    # Filter options available on the right sidebar
    list_filter = ('is_approved', 'posted_at', 'location')
    
    # Search functionality to look up jobs quickly
    search_fields = ('title', 'company', 'description')
    
    # Bulk actions dropdown inside the admin panel
    actions = ['approve_jobs']

    def approve_jobs(self, request, queryset):
        # Update the is_approved boolean status to True for selected jobs
        queryset.update(is_approved=True)
        # Display a success message banner to the admin user
        self.message_user(request, "Selected jobs have been approved successfully.")
    
    # Description label for the actions dropdown in the admin interface
    approve_jobs.short_description = "Approve selected jobs"

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    # Columns to display for job applications
    list_display = ('applicant', 'job', 'applied_at')
    
    # Look up applications filtered by company name using foreign key relationship
    list_filter = ('job__company', 'applied_at')

@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):
    # Display columns for the user resume model
    list_display = ('user', 'file', 'uploaded_at')

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    # Custom display columns to monitor users in the portal
    list_display = ('username', 'email', 'is_staff', 'date_joined')
