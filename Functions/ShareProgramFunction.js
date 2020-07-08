// Functions/ShareProgramFunction.js

import { Share } from 'react-native'

export function shareProgramFunction (program) {
  let messageToShare = program[0].muscle + " session\n"
  for (var i = 0; i < program.length; i++) {
    messageToShare += program[i].name + " " + program[i].tempo + "\n"
  }
  console.log(messageToShare)
  Share.share({ title: program[0].muscle, message: messageToShare})
}
