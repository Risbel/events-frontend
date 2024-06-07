import { DataDisco } from "@/services/getDisco";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { IconX } from "../dashboard/workspace/IconX";
import { Input, Label } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const FooterDisco = ({ discoData }: { discoData: DataDisco }) => {
  return (
    <section id="contact" style={{ background: discoData.discoDetail.discoColor.bgFooterColor }}>
      <div className="flex flex-col md:flex-row flex-wrap items-center md:items-start justify-center px-6 p-8 md:p-12 gap-8 mg:gap-16 w-full">
        <div className="flex flex-col items-center">
          <h3
            style={{ color: discoData.discoDetail.discoColor.foregroundFooterColor }}
            className="text-2xl font-semibold"
          >
            Company Info:
          </h3>
          <ol>
            <li style={{ color: discoData.discoDetail.discoColor.foregroundFooterColor }} className="flex">
              <p className="text-xl text-center">- {discoData.name} -</p>
            </li>
            <li
              style={{ color: discoData.discoDetail.discoColor.foregroundFooterColor }}
              className="flex gap-2 items-center"
            >
              <MapPin height={20} width={20} /> {discoData.discoDetail.address}
            </li>
          </ol>
        </div>
        <div className="flex flex-col items-center">
          <h3
            style={{ color: discoData.discoDetail.discoColor.foregroundFooterColor }}
            className="text-2xl font-semibold"
          >
            Contacts:
          </h3>
          <ol>
            <li style={{ color: discoData.discoDetail.discoColor.foregroundFooterColor }}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 hover:opacity-60"
                href={`mailto:${discoData.discoDetail.discoEmails[0].name}`}
              >
                <Mail /> <span>{discoData.discoDetail.discoEmails[0].name}</span>
              </a>
            </li>
            <li style={{ color: discoData.discoDetail.discoColor.foregroundFooterColor }}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 hover:opacity-60"
                href={`tel:${discoData.discoDetail.discoPhones[0].number}`}
              >
                <Phone /> <span>{discoData.discoDetail.discoPhones[0].number}</span>
              </a>
            </li>
          </ol>
        </div>

        <div>
          <h3
            style={{ color: discoData.discoDetail.discoColor.foregroundFooterColor }}
            className="text-2xl font-semibold"
          >
            Social:
          </h3>
          <div className="flex gap-4 items-center py-2">
            {discoData?.discoDetail?.discoNetwork?.facebook && (
              <a
                className="hover:scale-110 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
                href={`${discoData.discoDetail.discoNetwork.facebook}`}
              >
                <Facebook height={30} width={30} stroke={discoData.discoDetail.discoColor.foregroundFooterColor} />
              </a>
            )}
            {discoData?.discoDetail?.discoNetwork?.instagram && (
              <a
                className="hover:scale-110 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
                href={`${discoData.discoDetail.discoNetwork.instagram}`}
              >
                <Instagram stroke={discoData.discoDetail.discoColor.foregroundFooterColor} />
              </a>
            )}
            {discoData?.discoDetail?.discoNetwork?.youtube && (
              <a
                className="hover:scale-110 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
                href={`${discoData.discoDetail.discoNetwork.youtube}`}
              >
                <Youtube height={30} width={30} stroke={discoData.discoDetail.discoColor.foregroundFooterColor} />
              </a>
            )}
            {discoData?.discoDetail?.discoNetwork?.X && (
              <a
                className="hover:scale-110 transition-transform"
                target="_blank"
                rel="noopener noreferrer"
                href={`${discoData.discoDetail.discoNetwork.X}`}
              >
                <IconX fill={discoData.discoDetail.discoColor.foregroundFooterColor} />
              </a>
            )}
          </div>
        </div>

        {discoData.discoDetail.quickLinks.length > 0 && (
          <div className="flex flex-col items-center">
            <h3
              style={{ color: discoData.discoDetail.discoColor.foregroundFooterColor }}
              className="text-2xl font-semibold"
            >
              Quick Links:
            </h3>
            <ul>
              {discoData.discoDetail.quickLinks.map((link) => {
                return (
                  <li style={{ color: discoData.discoDetail.discoColor.foregroundFooterColor }} key={link.id}>
                    <a className="hover:opacity-60" target="_blank" rel="noopener noreferrer" href={link.url}>
                      {link?.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      {/* <div
          style={{ background: discoData.discoDetail.discoColor.bgFooterColor }}
          className="relative p-8 w-full md:w-1/2"
        >
          <form className="p-4 bg-primary-foreground border shadow-xl rounded-xl md:-translate-y-12 relative z-40">
            <h3 className="text-center text-primary font-bold text-xl">Contact Us</h3>
            <div className="flex flex-col gap-5 pt-4">
              <div className="relative">
                <Label name="Name" htmlfor="name" />
                <Input autoComplete="none" id="name" placeholder="name" />
              </div>
              <div className="relative">
                <Label name="Type your email" htmlfor="email" />
                <Input autoComplete="none" id="email" placeholder="email" />
              </div>
              <div className="relative">
                <Label name="Message" htmlfor="message" />
                <Textarea placeholder="message" autoComplete="none" id="message" />
              </div>
            </div>
            <Button className="w-full mt-4" type="submit">
              SUBMIT
            </Button>
          </form>
        </div> */}
    </section>
  );
};

export default FooterDisco;
