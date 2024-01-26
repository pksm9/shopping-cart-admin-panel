
export class Auth {
    static isAuthenticated() {
        const validTill = localStorage.getItem("validTill");
        if (validTill) {
            if (Date.now() > parseInt(validTill)) {
                // console.log("1")
                return false;
            } else {
                // console.log("2")
                return true;
            }
        } else {
            // console.log("3")
            return false;
        }
    }
  }