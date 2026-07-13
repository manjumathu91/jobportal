
from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):
    # Foreign key to link job to the user who posted it
    recruiter = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    salary = models.CharField(max_length=50, blank=True)
    job_type = models.CharField(max_length=50, choices=[('Full-time', 'Full-time'), ('Part-time', 'Part-time'), ('Contract', 'Contract')])
    posted_at = models.DateTimeField(auto_now_add=True)
    
    # Boolean field to track the job's approval status for admin panel workflow
    is_approved = models.BooleanField(default=False)
    
    # Added category field to fix the Serializer / Filter validation error
    category = models.CharField(max_length=100, default='IT')

    def __str__(self):
        return self.title
    
def user_directory_path(instance, filename):
    # File will be uploaded to MEDIA_ROOT/resumes/user_<id>/<filename>
    return f'resumes/user_{instance.user.id}/{filename}'

class Resume(models.Model):
    # OneToOne relation ensures one user can upload only one resume
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    file = models.FileField(upload_to=user_directory_path)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Resume for {self.user.username}"
   
class Application(models.Model):
    applicant = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE)
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # A user can only apply to a specific job once
        unique_together = ('applicant', 'job') 

    def __str__(self):
        return f"Application by {self.applicant.username} for {self.job.title}"
