
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth'
import { authSlice } from './authReduser'
import { app } from '../../firebase/config'

const authSignUpUser =
    ({ email, password, login }) =>
        async (dispatch) => {
            try {
                const auth = getAuth(app)
                await createUserWithEmailAndPassword(auth, email, password)

                const user = await auth.currentUser

                const updateUser = await updateProfile(user, {
                    displayName: login,
                })

                const { uid, displayName, photoURL, userEmail } = await auth.currentUser

                const userUpdateProfile = {
                    login: displayName,
                    userId: uid,
                    userAvatar: photoURL,
                    userEmail: userEmail,
                }

                dispatch(authSlice.actions.updateUserProfile(userUpdateProfile))
            } catch (error) {
                const errorCode = error.code
                const errorMessage = error.message
            }
        }

const authSignInUser =
    ({ email, password }) =>
        async () => {
            const auth = getAuth(app)
            if (auth.currentUser === null) {
                console.log('The email or password are wrong')
            }
            await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    console.log(user)
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                })
        }

const authStateChangeUser = () => async (dispatch) => {
    const auth = getAuth(app)
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            const userUpdateProfile = {
                login: user.displayName,
                userId: user.uid,
            }

            dispatch(authSlice.actions.updateUserProfile(userUpdateProfile))
            dispatch(authSlice.actions.authStateChange({ stateChange: true }))
        }
    })
}

const authSignOutUser = () => async (dispatch) => {
    const auth = getAuth(app)
    await signOut(auth)
    dispatch(authSlice.actions.authSignOut())
}

export { authSignUpUser, authSignInUser, authStateChangeUser, authSignOutUser }