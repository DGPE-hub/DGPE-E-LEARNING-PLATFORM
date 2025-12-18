import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

/* ===== CONFIG FIREBASE ===== */
const firebaseConfig = {
  apiKey: "AIzaSyDLeMFoRoclFnfubLqhJBvwtySxLttyHqs",
  authDomain: "dgpe-elearning.firebaseapp.com",
  projectId: "dgpe-elearning"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ===== NORMALISATION ===== */
function normalize(txt = "") {
  return txt
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "et")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* ===== RÈGLES OFFICIELLES DGPE 2026 ===== */
const dureesDGPE = {
  "gouvernance strategique et analyse financiere": "4 j",
  "pilotage strategique": "4 j",
  "audit et conformite": "3 j",
  "performance et kpi": "2 j",
  "transformation digitale": "3 j",
  "ia et decision": "2 j",
  "leadership": "2 j",
  "communication de crise": "2 j",
  "rse concevoir et piloter une strategie durable": "3 j",
  "manager le changement durable": "2 j"
};
];
/* ===== CORRECTION ===== */
async function corrigerDurees() {
  const snap = await getDocs(collection(db, "modules"));
  let count = 0;

  for (const d of snap.docs) {
    const data = d.data();
    const titre = data.titre || data.title || data.nom || "";
    const t = normalize(titre);

    const rule = rules.find(r =>
      r.match.every(word => t.includes(word))
    );

    if (rule && data.duree !== rule.duree) {
      await updateDoc(doc(db, "modules", d.id), {
        duree: rule.duree
      });
      console.log(`✔ ${titre} → ${rule.duree}`);
      count++;
    } else {
      console.log(`⏭ Ignoré : ${titre}`);
    }
  }

  document.body.innerHTML += `<p>✅ ${count} modules mis à jour.</p>`;
}

corrigerDurees();
