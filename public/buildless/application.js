// Why don't I have to run .start() on this one? Was require("@rails/ujs").start() in the original application.js
import ujs from '@rails/ujs'
import turbolinks from 'turbolinks'

turbolinks.start()
