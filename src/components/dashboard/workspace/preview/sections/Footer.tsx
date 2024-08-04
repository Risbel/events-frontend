import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { useIconsSocials } from "@/utils/useIconsSocials";
import { AddDiscoSchema } from "../../AddDiscos";

const Footer = ({ values }: { values: AddDiscoSchema }) => {
  const isSocial = values?.socials?.some((item) => item.url !== "");
  const isQuickLinks = values?.quickLinks?.some((item) => item.url !== "" && item.name !== "");

  const iconsSocial = useIconsSocials(values);

  return (
    <div id="5" style={{ background: values.bgFooterColor }} className="relative">
      <div className="flex flex-col-reverse md:flex-row">
        <div className="flex flex-wrap px-6 md:p-12 gap-8 md:w-1/2 lg:w-3/4">
          <div>
            <h3 style={{ color: values.foregroundFooterColor }} className="text-2xl font-semibold">
              Company Info:
            </h3>
            <ol>
              <li style={{ color: values.foregroundFooterColor }} className="flex">
                <p className="text-xl">- {values.name} -</p>
              </li>
              <li style={{ color: values.foregroundFooterColor }} className="flex gap-2 items-center">
                <MapPin height={20} width={20} /> {values.address}
              </li>
            </ol>
            {isSocial && (
              <div>
                <h3 style={{ color: values.foregroundFooterColor }} className="text-2xl font-semibold mt-6">
                  Social:
                </h3>
                <div className="flex gap-4 items-center py-2">
                  {iconsSocial.map((icon, i) => {
                    if (icon.isChecked) {
                      return (
                        <div className="hover:scale-105" key={i}>
                          {icon.link}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </div>
          {isQuickLinks && (
            <div>
              <h3 style={{ color: values.foregroundFooterColor }} className="text-2xl font-semibold">
                Quick Links:
              </h3>
              <ul>
                {values.quickLinks.map((link, i) => {
                  return (
                    <li style={{ color: values.foregroundFooterColor }} key={i}>
                      <a className="hover:opacity-60" target="_blank" rel="noopener noreferrer" href={link.url}>
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div>
            <h3 style={{ color: values.foregroundFooterColor }} className="text-2xl font-semibold">
              Contacts:
            </h3>
            <ol>
              <li style={{ color: values.foregroundFooterColor }}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 hover:opacity-60"
                  href={`mailto:${values.email}`}
                >
                  <Mail /> <span>{values.email}</span>
                </a>
              </li>
              <li style={{ color: values.foregroundFooterColor }}>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 hover:opacity-60"
                  href={`tel:${values.phone}`}
                >
                  <Phone /> <span>{values.phone}</span>
                </a>
              </li>
            </ol>
          </div>
        </div>

        <div style={{ background: values.bgFooterColor }} className="relative p-8 w-full md:w-1/2">
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
        </div>
      </div>
    </div>
  );
};

export default Footer;
