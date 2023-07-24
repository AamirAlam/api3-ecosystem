import axios from "axios";

export const useHttpCalls = () => {
  const submitProject = async (dappForm, images, token) => {
    try {
      const body = new FormData();

      // append dappform to body, dappForm is vue reactive, so needs .value
      body.append("name", dappForm.value.name);
      body.append("tagline", dappForm.value.tagline);
      body.append("description", dappForm.value.description);
      body.append("chains", JSON.stringify(dappForm.value.chains));
      body.append("categories", JSON.stringify(dappForm.value.categories));
      body.append("productType", dappForm.value?.productType);

      body.append("year", dappForm?.value?.year);

      const links = {
        website: dappForm.value.links.website,
        dapp: dappForm.value.links.dapp,
        docs: dappForm.value.links.docs,
        explorer: dappForm.value.links.explorer,
        socials: [],
      };

      if (dappForm?.value?.links?.socials?.twitter) {
        links.socials.push({
          label: "twitter",
          url: dappForm?.value?.links.socials.twitter,
        });
      }

      if (dappForm?.value?.links?.socials?.discord) {
        links.socials.push({
          label: "discord",
          url: dappForm?.value?.links.socials.discord,
        });
      }

      if (dappForm?.value?.links?.socials?.reddit) {
        links.socials.push({
          label: "reddit",
          url: dappForm?.value?.links.socials.reddit,
        });
      }

      if (dappForm?.value?.links?.socials?.github) {
        links.socials.push({
          label: "github",
          url: dappForm?.value?.links?.socials?.github,
        });
      }

      if (dappForm?.value?.links?.socials?.telegram) {
        links.socials.push({
          label: "telegram",
          url: dappForm?.value?.links.socials.telegram,
        });
      }

      if (dappForm?.value?.links?.socials?.facebook) {
        links.socials.push({
          label: "facebook",
          url: dappForm?.value?.links.socials.facebook,
        });
      }

      if (dappForm?.value?.links?.socials?.instagram) {
        links.socials.push({
          label: "instagram",
          url: dappForm?.value?.links.socials.instagram,
        });
      }

      if (dappForm?.value?.links?.socials?.youtube) {
        links.socials.push({
          label: "youtube",
          url: dappForm?.value?.links.socials.youtube,
        });
      }

      if (dappForm?.value?.links?.socials?.blog) {
        links.socials.push({
          label: "blog",
          url: dappForm?.value?.links.socials.blog,
        });
      }

      body.append("links", JSON.stringify(links));

      const proxies = dappForm.value.proxies;

      const proxyPayload = {};
      proxies?.forEach((el) => {
        if (!proxyPayload[el?.chainId]) {
          proxyPayload[el?.chainId] = [];
        }

        if (el.proxyType === "datafeedId") {
          proxyPayload[el?.chainId]?.push({
            proxyType: el?.proxyType,
            feedName: !el?.feedName ? "ETH/USD" : el?.feedName,
            datafeedId: el?.datafeedId,
            proxyAddress: el?.proxyAddress,
            oev: { enabled: el?.isOEV, beneficiary: el?.oevBeneficiary },
          });
        } else {
          proxyPayload[el?.chainId]?.push({
            proxyType: el?.proxyType,
            feedName: !el?.feedName ? "ETH/USD" : el?.feedName,
            dapiNameHash: el?.dapiNameHash,
            proxyAddress: el?.proxyAddress,
            oev: { enabled: el?.isOEV, beneficiary: el?.oevBeneficiary },
          });
        }
      });

      console.log("proxy payload ", proxyPayload);

      body.append("proxies", JSON.stringify(proxyPayload));

      // images
      body.append("logo", images.logo);
      body.append("cover", images.cover);

      images?.screenshots.forEach((fileItem, index) => {
        body.append(`screenshot${index + 1}`, fileItem);
      });

      const response = await axios.post("/api/projects", body, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 201) {
        return {
          success: true,
          message: "Project submitted for review",
          data: response?.data?.response?.response?.data,
        };
      } else {
        return { success: false, message: "Failed at server" };
      }
    } catch (error) {
      console.log("submit response error ", {
        error: error,
      });
      const errorMessage = error?.response?.data?.response?.response?.message;
      return { success: false, message: errorMessage };
    }
  };

  const submitArticle = async (articleForm, token) => {
    try {
      const res = await axios.post("/api/articles", articleForm, {
        headers: {
          Authorization: token,
        },
      });

      if (res.status === 201) {
        return { success: true, message: "Article submitted" };
      }

      return { success: false, message: "Failed to uplaod article" };
    } catch (error) {
      console.log("submit response error ", {
        error: error,
      });
      return { success: false, message: error?.response?.statusText };
    }
  };

  return { submitProject, submitArticle };
};
