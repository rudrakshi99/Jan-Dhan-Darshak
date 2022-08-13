from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import AllowAny, IsAuthenticated
from jan_dhan_darshak.core.utils import response_payload
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from jan_dhan_darshak.missing_suggestions.models import MissingSuggestions
from .serializers import MissingSuggestionsSerializer
# Create your views here.

#Create suggestions 
class missingSuggestion(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        
        try:
            # data=request.data
            data=request.data
            print(data)
            serializer= MissingSuggestionsSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                response_payload(success=True, data=serializer.data, msg="Thank you for the Suggestion!"),status=status.HTTP_200_OK,)
            return Response(
                response_payload(success=False, data=serializer.errors, msg="Invalid Data!"),status=status.HTTP_400_BAD_REQUEST,)
        except Exception as e:
            return Response(
                response_payload(success=False, data=str(e), msg="error while creating!"),status=status.HTTP_400_BAD_REQUEST,)

#Get suggestion by id
  
class trackSuggestion(APIView):
    
    permission_classes=[IsAuthenticated]
    def post(self,request):
        try:
            uid=request.data['uid']
            data=MissingSuggestions.objects.get(uid=uid)
            serializer=MissingSuggestionsSerializer(data)

            return Response(
                response_payload(success=True, data=serializer.data, msg="Thanks for the feedback."),status=status.HTTP_200_OK,)
                          
        except Exception as e:
            return Response(
                response_payload(success=False, msg=f"Suggestion not found with the track id : {request.data['uid']}"),status=status.HTTP_400_BAD_REQUEST,)


#get all suggestions by user id

class groupTrack(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        try:
            User=request.data['User']
            data=MissingSuggestions.objects.filter(User=User)
            print(data)
            serializer=MissingSuggestionsSerializer(data,many=True)
            return Response(
                response_payload(success=True, data=serializer.data, msg="Thanks for the feedback."),status=status.HTTP_200_OK,)
        
        except Exception as e:
            return Response(
                response_payload(success=False, msg= f"Suggestion not found for User Id- {request.data['User']}"),status=status.HTTP_400_BAD_REQUEST,)