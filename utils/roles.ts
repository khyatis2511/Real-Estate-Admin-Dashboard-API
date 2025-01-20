import permission from "./permission";

const roles = [
  {
    name: "admin",
    permissions: [
      permission.UPDATE_USER_STATUS,
    ]
  },
  {
    name: "user",
    permissions: [
    ]
  }
]

export default roles;