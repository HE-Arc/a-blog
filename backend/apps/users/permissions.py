from rest_framework import permissions, viewsets


class MixedPermissionModelViewSet(viewsets.ModelViewSet):
    '''
    Mixed permission base model allowing for action level
    permission control. Subclasses may define their permissions
    by creating a 'permission_classes_by_action' variable.
    Example:
    permission_classes_by_action = {'list': [AllowAny],
                                   'create': [IsAdminUser]}
    '''

    permission_classes_by_action = {}

    def get_permissions(self):
        try:
            # return permission_classes depending on `action`
            return [permission() for permission in
                    self.permission_classes_by_action[self.action] if
                    self.action is not None]
        except KeyError:
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]


class IsAdminOrIsErgoUser(permissions.BasePermission):
    # TODO: change message to French
    message = 'You have no permissions to perform that action.'

    def has_object_permission(self, request, view, ergo):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_staff or ergo.user == request.user


class IsAdminOrIsGroupModeratorUser(permissions.BasePermission):
    # TODO: change message to French
    message = 'You have no permissions to perform that action.'

    def has_object_permission(self, request, view, group):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_staff or group.moderator == request.user


class IsAdminOrIsGroupModeratorForErgoUser(permissions.BasePermission):
    # TODO: change message to French
    message = 'You have no permissions to perform that action.'

    def has_object_permission(self, request, view, ergo):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_staff or ergo.group.moderator == request.user


class IsAdminOrIsGroupModeratorForErgoUserOrIsErgoUser(
        permissions.BasePermission):
    # TODO: change message to French
    message = 'You have no permissions to perform that action.'

    def has_object_permission(self, request, view, ergo):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        return (request.user.is_staff or
                ergo.group.moderator == request.user or
                ergo.user == request.user)


class IsAdminOrIsRequestAssigneeUser(permissions.BasePermission):
    # TODO: change message to French
    message = 'You have no permissions to perform that action.'

    def has_object_permission(self, request, view, ergo):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_staff or request.assignee == request.user.ergo
