/* ===============================
   FIREBASE
================================ */
import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where
} from
  "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

/* ===============================
   CONFIG DGPE (LA TIENNE)
================================ */
const firebaseConfig = {
  apiKey: "AIzaSyDLeMFoRoclFnfubLqhJBvwtySxLttyHqs",
  authDomain: "dgpe-elearning.firebaseapp.com",
  projectId: "dgpe-elearning",
  storageBucket: "dgpe-elearning.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

/* ===============================
   INIT
================================ */
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

/* ===============================
   MODULES DGPE 2026
================================ */
const MODULES_DGPE = [
  { titre:"Gouvernance stratégique et analyse financière", domaine:"Gouvernance", duree:"4 j" },
  { titre:"Pilotage stratégique", domaine:"Gouvernance", duree:"4 j" },
  { titre:"Audit & conformité", domaine:"Gouvernance", duree:"3 j" },
  { titre:"Performance & KPI", domaine:"Performance", duree:"2 j" },
  { titre:"Transformation digitale", domaine:"Digital", duree:"3 j" },
  { titre:"IA & Décision", domaine:"Digital", duree:"2 j" },
  { titre:"Leadership", domaine:"Management", duree:"2 j" },
  { titre:"Communication de crise", domaine:"Management", duree:"2 j" },
  { titre:"RSE : Concevoir et piloter une stratégie durable", domaine:"Gouvernance", duree:"3 j" },
  { titre:"Manager le changement durable", domaine:"Management", duree:"2 j" }
];

/* ===============================
   LOG
================================ */
const logEl = document.getElementById("log");
const log = (m) => logEl.textContent += "\n" + m;

/* ===============================
   CRÉATION SÉCURISÉE
================================ */
async function creerModulesDGPE() {

  log("🔌 Connexion Firestore OK");
  let created = 0;

  for (const m of MODULES_DGPE) {

    // Anti-doublon
    const q = query(
      collection(db,"modules"),
      where("titre","==",m.titre)
    );

    const snap = await getDocs(q);

    if (!snap.empty) {
      log(`⏭ Déjà existant : ${m.titre}`);
      continue;
    }

    await addDoc(collection(db,"modules"),{
      titre: m.titre,
      domaine: m.domaine,
      duree: m.duree,
      actif: true,
      createdAt: serverTimestamp()
    });

    log(`✅ Créé : ${m.titre} → ${m.duree}`);
    created++;
  }

  log("────────────────────────────");
  log(`🎯 Modules créés : ${created}`);
  log("✅ IMPORT TERMINÉ");
}

creerModulesDGPE();
