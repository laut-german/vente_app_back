/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

admin.initializeApp();

// eslint-disable-next-line max-len
export const onEmailVerification = functions.auth.user().onCreate(async (user) => {
  if (user.emailVerified) {
    const nestJsEndpoint = "https://tu-servidor-nestjs.com/api/verificacion-email";

    try {
      await axios.post(nestJsEndpoint, {
        userId: user.uid,
        email: user.email,
        emailVerified: user.emailVerified
      });

      console.log("Notificación enviada con éxito");
    } catch (error) {
      console.error("Error al enviar notificación:", error);
    }
  }
});
