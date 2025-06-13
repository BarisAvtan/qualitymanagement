export const Actions = {
    setReduxToken: (state, action) => {
      //console.log("token :"+ action.payload.token);
      state.token = action.payload.token;
    },
    setAuthLevel: (state, action) => {
      state.authLevel = action.payload.authLevel;
    }

};