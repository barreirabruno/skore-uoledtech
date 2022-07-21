import './config/module-alias'

import { app } from '@/main/config/app'
const PORT = 3333

app.listen(PORT, () => console.log('[SERVER UP AND RUNNING]'))
