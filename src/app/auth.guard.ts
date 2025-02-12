import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    try {
      // 解析 JWT Payload
      const payload = JSON.parse(window.atob(jwt.split('.')[1]));
      const exp = new Date(Number(payload.exp) * 1000);

      if (new Date() > exp) {
        alert('JWT 已過期，請重新登入');
        return router.createUrlTree(['/login']); // 導向登入頁面
      }

      return true; // JWT 有效，允許進入
    } catch (error) {
      alert('JWT 無效，請重新登入');
      return router.createUrlTree(['/login']);
    }
  } else {
    alert('尚未登入');
    return router.createUrlTree(['/login']);
  }
};
