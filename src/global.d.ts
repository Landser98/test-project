declare global {
  interface Person {
    id?: number
    name: string
    department: number
    isHead?: boolean
  }
  interface Nurse {
    name: string
    department: string
    id: number
  }
  interface Doctor {
    name: string
    department: string
    type: string
    isHead: false
  }
}
