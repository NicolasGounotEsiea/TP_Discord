// jwt.config.ts

export default {
    secret: 'votre_clé_secrète', // Changez ceci pour une clé secrète sécurisée
    signOptions: {
      expiresIn: '1h', // Durée de validité du jeton (1 heure)
    },
  };
  