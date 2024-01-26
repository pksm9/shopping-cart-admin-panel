

export default function isAuthenticated() {
    const validTill = localStorage.getItem("validTill");
      if (validTill) {
          if (Date.now() > parseInt(validTill)) {
              return false;
          } else {
              return true;
          }
      } else {
          return false;
      }
}