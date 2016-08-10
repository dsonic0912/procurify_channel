from django.conf.urls import url, include

from . import views

urlpatterns = [
	url(r'^sample/$', views.SampleView.as_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]