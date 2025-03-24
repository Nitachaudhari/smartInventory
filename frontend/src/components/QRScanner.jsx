import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

const QRScanner = ({ onScan }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [scannedData, setScannedData] = useState("");

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        // Access user camera
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => console.error("Camera access error:", err));

        const scanQRCode = () => {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

                if (qrCode) {
                    setScannedData(qrCode.data);
                    onScan(qrCode.data);
                }
            }
            requestAnimationFrame(scanQRCode);
        };

        scanQRCode();
    }, []);

    return (
        <div>
            <h3>QR Code Scanner</h3>
            <video ref={videoRef} style={{ width: "100%" }} />
            <canvas ref={canvasRef} hidden />
            {scannedData && <p>Scanned Data: {scannedData}</p>}
        </div>
    );
};

export default QRScanner;
