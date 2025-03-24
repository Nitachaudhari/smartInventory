import { useEffect, useRef, useState } from "react";
import Quagga from "quagga"; // Import QuaggaJS
import axios from "axios";
import { Box, Button, Text, Spinner } from "@chakra-ui/react";

const BarcodeScanner = ({ onScan }) => {
  const [scanning, setScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (scanning) {
      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            constraints: {
              facingMode: "environment", // Use rear camera
            },
            target: videoRef.current, // Attach to video element
          },
          decoder: {
            readers: ["ean_reader", "upc_reader"], // Barcode types
          },
        },
        (err) => {
          if (err) {
            console.error("QuaggaJS init failed:", err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected(async (result) => {
        setScanning(false);
        Quagga.stop();
        const barcode = result.codeResult.code;
        onScan(barcode);
      });
    }
  }, [scanning]);

  return (
    <Box>
      {scanning && <Box ref={videoRef} width="100%" height="300px" />}
      {loading && <Spinner />}
      <Button
        colorScheme="teal"
        onClick={() => setScanning(true)}
        isDisabled={scanning}
      >
        Scan Barcode
      </Button>
    </Box>
  );
};

export default BarcodeScanner;
