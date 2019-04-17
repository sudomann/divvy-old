# divvy
Mobile app for students to split gas and ride together


python packages:
Django==2.2
django-phonenumber-field==2.3.1
djangorestframework==3.9.2
djangorestframework-simplejwt==4.1.5
phonenumbers==8.10.9

system packages:
GDAL (installed on Ubuntu 18.04 with `sudo apt install gdal-bin`)
sudo apt install  libsqlite3-mod-spatialite


Test run in Django shell
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