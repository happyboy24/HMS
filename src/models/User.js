

export class User {
  constructor({ id, name, email, phoneNumber }) {
    this.id = id || crypto.randomUUID()
    this.name = name
    this.email = email
    this.phoneNumber = phoneNumber
  }

  login() {

    console.log(`${this.name} logged in`)
  }

  logout() {
    console.log(`${this.name} logged out`)
  }
}
