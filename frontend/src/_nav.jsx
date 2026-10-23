/**
 * Sidebar Navigation Configuration
 *
 * Defines the structure and content of the sidebar navigation menu.
 * Supports multiple navigation component types from CoreUI React:
 * - CNavItem: Single navigation link
 * - CNavGroup: Collapsible group of links
 * - CNavTitle: Section title/divider
 *
 * @module _nav
 */

import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBug,
  cilCalculator,
  cilChartPie,
  cilDescription,
  cilExternalLink,
  cilLockLocked,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

/**
 * Navigation menu structure array
 *
 * @type {Array<Object>}
 * @property {React.ComponentType} component - CoreUI nav component (CNavItem, CNavGroup, CNavTitle)
 * @property {string} name - Display text for the nav item
 * @property {string} [to] - Internal route path (for CNavItem with routing)
 * @property {string} [href] - External URL (for CNavItem with external links)
 * @property {React.ReactNode} [icon] - Icon element to display
 * @property {Object} [badge] - Optional badge configuration
 * @property {string} badge.color - Badge color (info, danger, success, etc.)
 * @property {string} badge.text - Badge text content
 * @property {Array<Object>} [items] - Child items for CNavGroup
 *
 * @example
 * // Simple navigation item
 * {
 *   component: CNavItem,
 *   name: 'Dashboard',
 *   to: '/dashboard',
 *   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
 * }
 *
 * @example
 * // Navigation group with children
 * {
 *   component: CNavGroup,
 *   name: 'Components',
 *   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
 *   items: [
 *     {
 *       component: CNavItem,
 *       name: 'Cards',
 *       to: '/components/cards',
 *     },
 *   ],
 * }
 *
 * @example
 * // Section title
 * {
 *   component: CNavTitle,
 *   name: 'UI Elements',
 * }
 */
const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'UI Elements',
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Components',
    to: '/components',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/components/accordion',
      },
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/components/alerts',
      },
      {
        component: CNavItem,
        name: 'Badge',
        to: '/components/badge',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/components/breadcrumb',
      },
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/components/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons Group',
        to: '/components/button-group',
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/components/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/components/carousel',
      },
      {
        component: CNavItem,
        name: 'Chip',
        to: '/components/chip',
      },
      {
        component: CNavItem,
        name: 'Chip Set',
        to: '/components/chip-set',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/components/collapse',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/components/dropdowns',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/components/list-group',
      },
      {
        component: CNavItem,
        name: 'Modals',
        to: '/components/modals',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/components/navs-tabs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/components/pagination',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/components/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/components/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/components/progress',
      },
      {
        component: CNavItem,
        name: 'Search Button',
        to: '/components/search-button',
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/components/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/components/tables',
      },
      {
        component: CNavItem,
        name: 'Tabs',
        to: '/components/tabs',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/components/toasts',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/components/tooltips',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: 'Chip Input',
        to: '/forms/chip-input',
      },

      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Authentication',
    icon: <CIcon icon={cilLockLocked} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/authentication/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/authentication/register',
      },
      {
        component: CNavItem,
        name: 'Check Email',
        to: '/authentication/check-email',
      },
      {
        component: CNavGroup,
        name: 'Quên mật khẩu',
        items: [
          {
            component: CNavItem,
            name: 'Đổi mật khẩu',
            to: '/admink/change-password',
          },
        ],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Error pages',
    icon: <CIcon icon={cilBug} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/error-pages/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/error-pages/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
