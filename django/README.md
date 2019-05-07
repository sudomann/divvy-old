# divvy
Mobile app for students to split gas and ride together

system packages:
GDAL (installed on Ubuntu 18.04 with `sudo apt install gdal-bin`)
sudo apt install  libsqlite3-mod-spatialite


Test runs in Django shell
```
from users.models import Domain, CustomUser, Zone
new_domain = Domain(hostname="frostburg.edu", details="for FSU students")
new_domain.save()
print(new_domain.available_zones)
# users.Zone.None
new_user = CustomUser(email='wfnjundong0@frostburg.edu', first_name='Will', last_name='Njund', phone='2023456789', is_minor=False, gender='U', domain=new_domain)
new_user.save()
CustomUser.objects.get(id=2)
# <CustomUser: wfnjundong0@frostburg.edu>
```

```
>>> CustomUser.objects.create_superuser(email='admin2@admins.com', password='p', first_name='Will', last_name='Njund', phone='2023456789', is_minor=False, gender='U', domain=dom)
<CustomUser: admin2@admins.com>
```

To render graphical representation of project
```
./manage.py graph_models -a -g -o my_project_visualized.svg
```

Test 
```
from django.test.client import RequestFactory
from djoser.views import ActivationView
import inspect
```


Note's relating to calling a class based view from another view

```
# stash credentials first
data = { 'uid':'MzM', 'token':'563-6a102cdb870f3a3bf5ee'}

# then make POST request with the credential data
request = RequestFactory().post('/account/activate/MzM/563-6a102cdb870f3a3bf5ee',                                    data)
# pass the request to the Activation class based view
activate = ActivationView.as_view()(request)
```