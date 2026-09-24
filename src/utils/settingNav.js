import {UserRound,Store,CreditCard,Receipt,Plug,LogOut,Shield,Save} from 'lucide-react';

export const settingsNavItems = [
  { 
    path: '/dashboard/settings', 
    label: 'Profile', 
    icon: UserRound 
  },
  { 
    path: '/dashboard/settings/storefront', 
    label: 'Storefront', 
    icon: Store 
  },
  { 
    path: '/dashboard/settings/payments', 
    label: 'Payments & Billing', 
    icon: Save 
  },
  // { 
  //   path: '/dashboard/settings/billing', 
  //   label: 'Billing', 
  //   icon: Receipt 
  // },
  // { 
  //   path: '/dashboard/settings/integrations', 
  //   label: 'Integrations', 
  //   icon: Plug 
  // },
  { 
    path: '/dashboard/settings/security', 
    label: 'Security & Acesss', 
    icon: Shield 
  },
];