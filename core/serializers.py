
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Job
from .models import Resume,Application

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
class JobSerializer(serializers.ModelSerializer):
   class Meta:
     model = Job
     fields = '__all__' # Expose all fields
     read_only_fields = ('recruiter',) # Recruiter is automatically set in the view

class ResumeSerializer(serializers.ModelSerializer):
   class Meta:
     model = Resume
     fields = ('id', 'file', 'uploaded_at', 'user')
     read_only_fields = ('user',)

class ApplicationSerializer(serializers.ModelSerializer):
    job_title = serializers.CharField(source="job.title", read_only=True)
    company = serializers.CharField(source="job.company", read_only=True)
    location = serializers.CharField(source="job.location", read_only=True)
    job_type = serializers.CharField(source="job.job_type", read_only=True)

    class Meta:
        model = Application
        fields = (
            "id",
            "job",
            "job_title",
            "company",
            "location",
            "job_type",
            "applied_at",
        )
        read_only_fields = ("applicant", "resume")
