import { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { Check, Copy, Download, LucideShare2, Settings, Share } from "lucide-react";
import { DataDisco } from "@/services/getDisco";

const QrGeneratorPro = ({ disco }: { disco: DataDisco }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const downloadQR = () => {
    const canvas: any = document.getElementById("myqr");
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "myqr.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const buildURL = () => {
    let url = `https://event.myaipeople.com/event/${disco.slug}`;
    return url;
  };

  const handleShareUrl = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Cool Content",
          text: "Check out this cool content!",
          url: window.location.href,
        });
      } catch (error) {
        alert("Error sharing content");
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  const handleShareQr = async () => {
    const canvas: any = document.getElementById("myqr");
    canvas.toBlob(async (blob: Blob) => {
      const filesArray = [new File([blob], "myqr.png", { type: "image/png" })];

      if (navigator.share) {
        try {
          await navigator.share({
            title: `${disco.discoDetail.h1Banner}`,
            text: `${disco.discoDetail.bannerDescription}`,
            url: `https://event.myaipeople.com/event/${disco.slug}`,
            files: filesArray,
          });
        } catch (error) {
          alert("Error sharing content");
        }
      } else {
        alert("Web Share API is not supported in your browser.");
      }
    }, "image/png");
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full items-center justify-center">
      <div className="rounded-xl border shadow-md overflow-hidden">
        <QRCode
          id="myqr"
          value={buildURL()}
          bgColor="#ffffff"
          eyeRadius={[
            [8, 8, 0, 8], // top/left eye
            [8, 8, 8, 0], // top/right eye
            [8, 0, 8, 8], // bottom/left
          ]}
          eyeColor={[
            disco.discoDetail.discoColor.brandColor, // top/left eye
            "#000000",
            "#000000",
          ]}
          qrStyle="squares"
          logoPaddingStyle="circle"
        />
      </div>

      <div className="flex gap-2 items-center">
        <button type="button" onClick={downloadQR} className="border rounded-xl p-1 hover:shadow-md">
          <Download />
        </button>
        <button className="border rounded-xl p-1 hover:shadow-md" onClick={handleShareQr}>
          <LucideShare2 />
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <span>{buildURL()}</span>
        <div className="flex gap-2">
          <button
            className="border rounded-xl p-1 hover:shadow-md active:scale-125 active:rotate-180"
            onClick={() => {
              navigator.clipboard.writeText(buildURL());
              setCopySuccess(true);
              setTimeout(() => {
                setCopySuccess(false);
              }, 3000);
            }}
          >
            {copySuccess ? <Check /> : <Copy />}
          </button>

          <button className="border rounded-xl p-1 hover:shadow-md" onClick={handleShareUrl}>
            <LucideShare2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrGeneratorPro;
