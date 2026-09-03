import {User,Store,CreditCard,Receipt,Plug,LogOut,} from 'lucide-react';

export const settingsNavItems = [
  { 
    path: '/dashboard/settings/profile', 
    label: 'Profile', 
    icon: User 
  },
  { 
    path: '/dashboard/settings/storefront', 
    label: 'Storefront', 
    icon: Store 
  },
  { 
    path: '/dashboard/settings/payments', 
    label: 'Payments', 
    icon: CreditCard 
  },
  { 
    path: '/dashboard/settings/billing', 
    label: 'Billing', 
    icon: Receipt 
  },
  { 
    path: '/dashboard/settings/integrations', 
    label: 'Integrations', 
    icon: Plug 
  },
];