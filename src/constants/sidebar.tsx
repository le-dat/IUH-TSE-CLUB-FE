import { FiUsers } from 'react-icons/fi'
import { GrGroup } from 'react-icons/gr'
import { MdEventNote, MdOutlineDevices } from 'react-icons/md'
import { SiSimpleanalytics } from 'react-icons/si'

export const userMenu = [
  {
    icon: MdEventNote,
    label: 'Event',
    path: '/',
    submenu: [
      { label: 'Request', path: '/request', icon: MdEventNote },
      { label: 'Manager', path: '/', icon: MdEventNote },
    ],
  },
  {
    icon: FiUsers,
    label: 'Users',
    path: '/users',
    submenu: [{ label: 'Manager', path: '/users/manager', icon: FiUsers }],
  },
  {
    icon: MdOutlineDevices,
    label: 'Device',
    path: '/device',
    submenu: [{ label: 'Manager', path: '/device/manager', icon: MdOutlineDevices }],
  },
  {
    icon: GrGroup,
    label: 'Team',
    path: '/team',
    submenu: [
      { icon: SiSimpleanalytics, label: 'Analyst', path: '/team/analyst' },
      { label: 'Manager', path: '/team/manager', icon: GrGroup },
    ],
  },
]

export const adminMenu = [
  {
    icon: MdEventNote,
    label: 'Event',
    path: '/',
    submenu: [
      { label: 'Request', path: '/request', icon: MdEventNote },
      { label: 'Manager', path: '/', icon: MdEventNote },
    ],
  },
  {
    icon: FiUsers,
    label: 'Users',
    path: '/users',
    submenu: [
      { label: 'Request', path: '/users/request', icon: FiUsers },
      { label: 'Manager', path: '/users/manager', icon: FiUsers },
    ],
  },
  {
    icon: MdOutlineDevices,
    label: 'Device',
    path: '/device',
    submenu: [
      { label: 'Request', path: '/device/request', icon: MdOutlineDevices },
      { label: 'Manager', path: '/device/manager', icon: MdOutlineDevices },
    ],
  },
  {
    icon: GrGroup,
    label: 'Team',
    path: '/team',
    submenu: [
      { icon: SiSimpleanalytics, label: 'Analyst', path: '/team/analyst' },
      { label: 'Manager', path: '/team/manager', icon: GrGroup },
    ],
  },
]
