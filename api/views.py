from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

class SampleView(APIView):
	def get(self, request, format=None):
		return Response({})