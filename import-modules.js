import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

/* ===============================
   CONFIG FIREBASE (OFFICIELLE)
================================ */
const firebaseConfig = {
  apiKey: "AIzaSyDLeMFoRoclFnfubLqhJBvwtySxLttyHqs",
  authDomain: "dgpe-elearning.firebaseapp.com",
  projectId: "dgpe-elearning",
  storageBucket: "dgpe-elearning.firebasestorage.app",
  messagingSenderId: "564422941000",
  appId: "1:564422941000:web:f5232cd0cebafb6aaf7b7d"
};

const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

/* ===============================
   MODULES DGPE OFFICIELS 2026
================================ */
const MODULES_DGPE = [
  { titre: "Gouvernance stratégique et analyse financière", domaine: "Gouvernance", duree: "4 j" },
  { titre: "Pilotage stratégique", domaine: "Gouvernance", duree: "4 j" },
  { titre: "Audit & conformité", domaine: "Gouvernance", duree: "3 j" },
  { titre: "Performance & KPI", domaine: "Performance", duree: "2 j" },
  { titre: "Transformation digitale", domaine: "Digital", duree: "3 j" },
  { titre: "IA & Décision", domaine: "Digital", duree: "2 j" },
  { titre: "Leadership", domaine: "Management", duree: "2 j" },
  { titre: "Communication de crise", domaine: "Management", duree: "2 j" },
  { titre: "RSE : Concevoir et piloter une stratégie durable", domaine: "Gouvernance", duree: "3 j" },
  { titre: "Manager le changement durable", domaine: "Management", duree: "2 j" }
];

/* ===============================
   LOG UI
================================ */
const logBox = document.getElementById("log");
function log(msg) {
  console.log(msg);
  logBox.textContent += "\n" + msg;
}

/* ===============================
   IMPORT FIRESTORE
================================ */
async function creerModulesDGPE() {
  try {
    log("🔌 Connexion à Firestore…");

    let count = 0;

    for (const m of MODULES_DGPE) {
      await addDoc(collection(db, "modules"), {
        titre: m.titre,
        domaine: m.domaine,
        duree: m.duree,
        actif: true,
        createdAt: serverTimestamp()
      });

      count++;
      log(`✔ ${m.titre} → ${m.duree}`);
    }

    log("================================");
    log(`✅ Modules créés : ${count}`);
    log("🎉 IMPORT TERMINÉ");

  } catch (err) {
    console.error(err);
    log("❌ ERREUR FIRESTORE");
    log(err.message);
  }
}

creerModulesDGPE();
