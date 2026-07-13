
from django.db.backends.base.base import BaseDatabaseWrapper
from django.db.backends.mysql.features import DatabaseFeatures

# 1. Django 6-ன் வெர்ஷன் செக் செய்யும் கட்டாயத்தை ஏமாற்றுகிறோம்
BaseDatabaseWrapper.check_database_version_supported = lambda self: None

# 2. பழைய MariaDB 10.4-ல் 'RETURNING' சிண்டாக்ஸ் இல்லை என்பதை Django 6-க்குக் கட்டாயப்படுத்திச் சொல்கிறோம்
DatabaseFeatures.can_return_rows_from_bulk_insert = False
DatabaseFeatures.has_select_for_update_skip_locked = False

# குறிப்பு: mysqlclient பயன்படுத்தும்போது 'install_as_MySQLdb()' எழுதத் தேவையில்லை, அது நேரடியாகவே வேலை செய்யும்.
