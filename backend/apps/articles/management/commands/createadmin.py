from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import (
    BaseCommand,
    CommandError
)
from django.db.utils import IntegrityError


class Command(BaseCommand):
    help = 'Creates admin user admin@snase.ch:password.'

    def handle(self, *args, **options):

        try:
            User = get_user_model()

            User.objects.create_superuser(settings.SUPER_ADMIN_EMAIL,
                                          settings.SUPER_ADMIN_PASSWORD,
                                          first_name="Admin",
                                          last_name="Super")
            self.stdout.write(self.style.SUCCESS(f'Successfully created super admin user '))

        except (IntegrityError, CommandError):
            self.stdout.write(
                self.style.WARNING(
                    'User "%s" already exists.' % 'admin'))
