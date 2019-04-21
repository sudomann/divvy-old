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