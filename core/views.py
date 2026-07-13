
from django.shortcuts import render
from rest_framework import status, generics, parsers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .models import Job, Application, Resume
from .serializers import UserSerializer, JobSerializer, ResumeSerializer, ApplicationSerializer
from .filters import JobFilter

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class JobView(ListCreateAPIView):
    queryset = Job.objects.filter(is_approved=True).order_by('-posted_at')
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_class = JobFilter

    def perform_create(self, serializer):
        serializer.save(recruiter=self.request.user)
class JobDetailView(RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ResumeUploadView(generics.CreateAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def perform_create(self, serializer):
        print("User:", self.request.user)
        serializer.save(user=self.request.user)


class ApplyView(generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        job_id = request.data.get('job_id')
        try:
            
            resume = Resume.objects.get(user=request.user)
            if Application.objects.filter(applicant=request.user, job_id=job_id).exists():
                return Response({'detail': 'You have already applied for this job.'}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer = self.get_serializer(data={'job': job_id})
            serializer.is_valid(raise_exception=True)
            serializer.save(applicant=request.user, resume=resume)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Resume.DoesNotExist:
            return Response({'detail': 'Please upload your resume first.'}, status=status.HTTP_400_BAD_REQUEST)

class AppliedJobsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
         return Application.objects.filter(applicant=self.request.user).order_by('-applied_at')
