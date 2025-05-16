import {
  generateRegistrationOptions
} from '@simplewebauthn/server';
import { user as userCred } from '../Database/Schemas/userSchema.js';

async function getUserFromDB(userId){
    var user=await userCred.findOne({'_id':userId});
    return user;
}

async function setCurrentRegistrationOptions(userId,RegistrationOptions){
  const updatedDocument=await userCred.findByIdAndUpdate(userId,{RegistrationOptions},{new:true});
}


export async function createRegistrationOptions(userId) {
  // Retrieve the user from the database
  const user = await getUserFromDB(userId);

  // Retrieve user's previously registered passkeys
//   const userPasskeys = await getUserPasskeys(user);

  // Generate registration options
  const options = await generateRegistrationOptions({
    rpName: 'SpecialCart',       // Replace with your RP (Relying Party) name
    rpID: 'localhost',          // Replace with your domain
    userName: user.userEmail,

    attestationType: 'none',       // No attestation prompt

    // excludeCredentials: userPasskeys.map(passkey => ({
    //   id: passkey.id,
    //   // Optional field for preferred transports (USB, BLE, etc.)
    //   transports: passkey.transports,
    // })),

    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred',
      authenticatorAttachment: 'platform', // platform = built-in like Face ID or Windows Hello
    },
  });

  // Store the options (e.g. in DB or session)
  await setCurrentRegistrationOptions(userId, options);

  // Return the registration options to the client
  return options;
}
