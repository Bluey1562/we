
    /**
     * Upload data to Firebase Realtime Database
     * @param path Firebase database path
     * @param jsonData JSON string data
     */
    //% subcategory="Firebase"
    //% weight=29
    //% blockGap=8
    //% blockId=esp8266_upload_firebase
    //% block="Upload to Firebase|Path %path|JSON data %jsonData"
    export function uploadFirebase(path: string, jsonData: string) {

        firebaseUploaded = false

        // Pastikan WiFi tersambung
        if (!isWifiConnected()) return

        // Connect ke Firebase
        if (!sendCommand(
            "AT+CIPSTART=\"TCP\",\"" + FIREBASE_HOST + "\",80",
            "OK",
            10000
        )) return

        // HTTP Body
        let body = jsonData

        // HTTP Header
        let request =
            "POST " + path + ".json HTTP/1.1\r\n" +
            "Host: " + FIREBASE_HOST + "\r\n" +
            "Content-Type: application/json\r\n" +
            "Content-Length: " + body.length + "\r\n\r\n" +
            body

        // Kirim data
        sendCommand("AT+CIPSEND=" + request.length)
        sendCommand(request)

        // Cek status kirim
        if (getResponse("SEND OK", 2000) == "") return

        // Cek respon Firebase
        let response = getResponse("+IPD", 3000)
        if (response == "") return

        firebaseUploaded = true
    }
}

