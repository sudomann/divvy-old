from django.views.generic.base import TemplateView
from djoser.views import ActivationView as DjoserActivationView
from django.test.client import RequestFactory
#import json


class ActivationView(TemplateView):

    template_name = "users/activated.html"

    def dispatch(self, request, *args, **kwargs):
        form_data = {
            'uid': kwargs['uid'],
            'token': kwargs['token']
        }

        # TODO: override setup() and modify original request in there??
        alt_request = RequestFactory().post('/api/auth/users/confirm/', form_data)
        activate_view_response = DjoserActivationView.as_view()(alt_request)
        #data = json.loads(activate_view_response.rendered_content)

        kwargs['activation_status_code'] = activate_view_response.status_code
        # 204 is success
        # 400 is an error went wrong on our end
        # 403 is a stale token
        return super().dispatch(request, *args, **kwargs)
