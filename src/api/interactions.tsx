import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from 'discord-interactions'
import { NextApiHandler } from 'next'

const CLIENT_KEY =
  '43538a840f95ea1ef19a84839ad689b33aff412c91e0140ae84921dec905a04a'

export const interactions: NextApiHandler = async (
  { headers, body, method },
  res,
) => {
  // Validate request
  if (method !== 'POST') {
    res.status(405).end()
    return
  }

  const signature = headers['X-Signature-Ed25519'] as string
  const timestamp = headers['X-Signature-Timestamp'] as string

  const isValidRequest = verifyKey(body, signature, timestamp, CLIENT_KEY)

  if (!isValidRequest) {
    res.status(401).end()
    return
  }

  // Handle interaction
  const { type, id, data } = body

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG })
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name, options } = data
    if (name === 'test') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: 'hello world',
        },
      })
    }
  }

  return res.status(200).json({ message: 'Hello World' })
}
