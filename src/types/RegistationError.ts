export default interface IRegistrationError {
  email: boolean,
  password: boolean,
  name: boolean,
  surname: boolean,
  passwordConfirmation: boolean,
  passwordEquality: boolean,
}
