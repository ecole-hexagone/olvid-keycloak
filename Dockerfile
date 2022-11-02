FROM quay.io/keycloak/keycloak:17.0.1-legacy
WORKDIR /opt/jboss/keycloak

ADD ./olvid_keycloak_plugin_v2.0 /opt/jboss/keycloak/
COPY ./olvid-deploy.cli /opt/jboss/startup-scripts/

ENTRYPOINT ["/opt/jboss/tools/docker-entrypoint.sh"]
CMD ["-b", "0.0.0.0"]