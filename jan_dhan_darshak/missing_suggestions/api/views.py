from django.shortcuts import render

# Create your views here.
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from jan_dhan_darshak.missing_suggestions.models import MissingSuggestions
from .serializers import MissingSuggestionsSerializer
# Create your views here.

#Create suggestions and get all suggestions
# Request Body:{
#         "User":1,
#         "pointName":"asd",
#         "address": "dasd",
#         "otherdetails":"asd",
#         "latitude": 12.1211222,
#         "longitude": 121.1232123
#           }
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
                return Response({
                'status': True,
                'message': 'success data',
                'data': serializer.data,
                })
            return Response({
                'status': False,
                'message': 'invalid data',
                'data': serializer.errors,
            })
        except Exception as e:
            return Response({
                'status': 400,
                'message': 'Bad Request',
                'error': str(e)
            })

#Get suggestion by id
    #Request Body: {
    #     "uid": "0cd45845-8a85-4221-a5cf-2419566b0801"
    # }
class trackSuggestion(APIView):
    
    permission_classes=[IsAuthenticated]
    def post(self,request):
        try:
            uid=request.data['uid']
            data=MissingSuggestions.objects.get(uid=uid)
            serializer=MissingSuggestionsSerializer(data)
            return Response({
            'status': True,
            'message': 'success data',
            'data': serializer.data,
            })
        except Exception as e:
            return Response({
                'status': 400,
                'message': 'Bad Request',
                'error': f"Suggestion not found with the track id- {request.data['uid']}"
            })


#get all suggestions by user id
# Request Body: {
#     "User":1
# }
class groupTrack(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):
        try:
            User=request.data['User']
            data=MissingSuggestions.objects.get(User=User)
            serializer=MissingSuggestionsSerializer(data)
            return Response({
            'status': True,
            'message': 'success data',
            'data': serializer.data,
            })
        except Exception as e:
            return Response({
                'status': 400,
                'message': 'Bad Request',
                'error': f"Suggestion not found for User Id- {request.data['User']}"
            })
